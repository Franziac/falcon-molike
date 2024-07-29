export class ScheduleEvent
{
    public text = "";
    public duration = 0;
    constructor(text: string, duration: number) {
        this.text = text;
        this.duration = duration;
    }
}