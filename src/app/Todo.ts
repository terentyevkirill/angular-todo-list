export class Todo {
    // TODO: Add datestamp and color
    id: number;
    text: string;
    date: Date;

    constructor(text?: string) {
        this.text = text;
        this.date = new Date;
    }

}