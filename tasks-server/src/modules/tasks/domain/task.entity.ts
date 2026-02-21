export class Task {
  constructor(
    public readonly id: number,
    public title: string,
    public status: string,
    public date: Date,
    public userId: number,
  ) {}
}
