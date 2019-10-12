import { Change } from "firebase-functions";
import { DataSnapshot } from "firebase-functions/lib/providers/database";
import { DeterminerOut } from "../typings/common";

export const isEmptyObject = (object: object) => !Object.keys(object).length;
export type ActionType = 'CREATE' | 'UPDATE' | 'DELETE';
export const determineAction = <Model>(data: Change<DataSnapshot>): DeterminerOut<Model> => {
    let action: ActionType;
    let payload: Model;

    const isBefore = data.before.exists();
    const isAfter = data.after.exists();

    if (isBefore && isAfter) {
        action = 'UPDATE';
        payload = data.after.val();
    } else if (!isBefore && isAfter) {
        action = 'CREATE';
        payload = data.after.val();
    } else {
        action = 'DELETE';
        payload = data.before.val();
    }

    return {
        action,
        data: payload
    }
}

export const parseDataObject = (object: object) => JSON.parse(JSON.stringify(object));

export function generatePagination(page: number = 1, perPage: number = 10) {
    let pg = page;
    let from, size = 0;

    if (pg <= 0) {
        pg = 1;
    }
    pg = pg - 1;
    from = (pg * perPage);
    size = perPage;

    return { from, size };
}

export const generateHashMap = (arr: any[], key: string) => {
    const hash: { [s: string]: any } = {};

    arr.forEach((item: any): void => {
        hash[item[key]] = item;
    })

    return hash;
}

export const elasticDataExsist = (elasticResult:{ hits: { hits: any[], total: { value: number } | number }}) => {
    const total = elasticResult.hits.total;
    const count = typeof total === 'number' ? elasticResult.hits.total : elasticResult.hits.total;
    return count > 0;
}