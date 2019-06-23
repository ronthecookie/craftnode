import { ChatMessagePart, ChatMessageStringPart } from "./Player";
export function chatMessagePartsToString(cms: ChatMessagePart[]): string {
    return cms
        .filter(cm => (<ChatMessageStringPart>cm).text)
        .map(cm => (<ChatMessageStringPart>cm).text)
        .join("");
}
export function chatMessageToPacketField(
    t: string | ChatMessagePart[]
): string {
    if (typeof t == "string") return JSON.stringify({ text: t });
    else return JSON.stringify({ text: "", extra: t });
}
