import { faker } from "@faker-js/faker";

export const fakeData = (offset?:number) => {
    const words: string = faker.random.words(offset? offset + 10000: 10000);
    const objArr = words.split(" ").map((item, id) => ({
        name: item.toUpperCase(),
        id: id + 1,
        acronym: item.slice(0, 2).toLocaleUpperCase(),
    }));

    return objArr;
}