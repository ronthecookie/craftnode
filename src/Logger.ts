import colors from "colors/safe";
const production = process.env.NODE_ENV == "production";
export class Logger {
    static get time() {
        const d = new Date(process.uptime() * 1000)
        function pad(number: number) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }
        return `${pad(d.getUTCHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }
    private log(message?: string, ...optionalParams: string[]) {
        // TODO: Consider implementing a log to file option
        console.log(message, ...optionalParams);
    }
    private logErr(message?: string, ...optionalParams: string[]) {
        // TODO: Consider implementing a log to file option
        console.error(message, ...optionalParams);
    }
    public info(message?: any, ...optionalParams: any[]) {
        this.log(colors.gray(`[${Logger.time} info]`), message, ...optionalParams);
    } 
    public debug(message?: any, ...optionalParams: any[]) {
        if (production) return;
        optionalParams = optionalParams.map(p => colors.gray(p));
        this.logErr(colors.gray(`[${Logger.time} debug]`), colors.gray(message), ...optionalParams);
    } 
    public error(message?: any, ...optionalParams: any[]) {
        optionalParams = optionalParams.map(p => colors.red(p));
        this.logErr(colors.gray(`[${Logger.time} error]`), colors.red(message), ...optionalParams);
    } 
    public warn(message?: any, ...optionalParams: any[]) {
        optionalParams = optionalParams.map(p => colors.red(p));
        this.logErr(colors.gray(`[${Logger.time} info]`), colors.red(message), ...optionalParams);
    } 
}