import { Change } from "firebase-functions";
import { DataSnapshot } from "firebase-functions/lib/providers/database";
import { DeterminerOut, ObjectAny } from "../typings/common";

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

export const parseDataObject = (object: object): object => JSON.parse(JSON.stringify(object));

export const offset = (page: number = 1, per_page: number = 10): number => (page - 1) * per_page;

export const isEmptyArray = (array: any[]): boolean => array.length === 0;

export const trimObjectKey = (object: ObjectAny): ObjectAny => {
    Object.keys(object).forEach(
        (key: string): boolean =>
            (object[key] === null || object[key] === '' || object[key] === undefined) && delete object[key]
    );
    return object;
};

export const stringifyObjectKey = (object: ObjectAny): ObjectAny => {
    Object.keys(object).forEach((key: string): void => {
        object[key] = String(object[key]);
    });
    return object;
};

export const reduceData = (data: any): any => {
    return Object.keys(data).reduce((res: any, key: string): any => {
        res[key] = data[key][0];
        return res;
    }, {});
};

export const sorter = (sort: string = '-created_at'): string[] => {
    let sortString = sort;
    let sortMethod;

    if (sortString.charAt(0) === '-') {
        sortMethod = 'desc';
        sortString = sort.substr(1);
    } else {
        sortMethod = 'asc';
    }

    return [sortString, sortMethod];
};
