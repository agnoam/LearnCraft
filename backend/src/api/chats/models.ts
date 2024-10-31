// TODO: References type will change as soon the database type will be determined 

export interface Chat {
    title: string;
    generatedIcon?: any;
    ownerID: string; // Reference to the owner user document
}

export interface Message {
    content: any; // TODO: To Be Defined
    sendingDate: Date;
    sender: 'user' | 'server';
    chatID: string; // Reference to the chat document
}