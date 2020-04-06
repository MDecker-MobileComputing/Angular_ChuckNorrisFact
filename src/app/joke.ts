

/**
 * One object of this class represents one Chuck Norris fact from icndb.
 */
export class Joke {

    /** Actual text of the Chuck Norris fact. */
    private text = '';

    /** Number acting as primary key for the Joke in icndb. */
    private id = -1;


    /**
     *
     * @param text  Text of joke
     * @param id  Unique ID of joke in icndb
     */
    constructor(text: string, id: number) {

        this.text = text;
        this.id   = id;
    }


    /**
     * Setter for text of joke.
     *
     * @param text  Text of Chuck Norris fact
     */
    public setText(text: string): void {

        this.text = text;
    }

    /**
     * Getter for text of joke.
     *
     * @return Actual text of Chuck Norris Fact.
     */
    public getText(): string {

        return this.text;
    }

    /**
     * Setter for primary key of joke in icndb.
     *
     * @param id  Unique ID of joke in icndb.
     */
    public setID(id: number): void {

        this.id = id;
    }

    /**
     * Getter for primary key of joke in icndb.
     *
     * @return  Unique ID of joke in icndb.
     */
    public getID(): number {

        return this.id;
    }

    /**
     * When this method return true, then the UI should display a warn dialog
     * saying that currently no messages are available.
     *
     * @return true when text is null or an empty string.
     */
    public isEmpty(): boolean {

        return this.text == null || this.text === '';
    }

}
