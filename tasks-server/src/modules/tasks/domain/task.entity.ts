export class Task {
  constructor(
    public readonly id: number,
    public title: string,
    public completed: boolean,
    public userId: number,
  ) {}
}
