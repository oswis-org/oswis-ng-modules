export class HttpStatusCodeModel {

  public code: number;
  public title: string;
  public localTitle: string;
  public description: string;

  constructor(code: number, title: string = null, localTitle: string = null, description: string = null) {
    this.code = code;
    this.title = title;
    this.localTitle = localTitle;
    this.description = description;
  }

  public codeAndTitle(): string {
    return '' + this.code + (this.title ? (' ' + this.title) : null);
  }

  codeAndLocalTitle(): string {
    return '' + this.code + (this.getLocalTitleOrTitle() ? (' ' + this.getLocalTitleOrTitle()) : null);
  }

  getLocalTitleOrTitle(): string {
    return this.localTitle || this.title;
  }

  type(): string {
    switch (this.firstCipher()) {
      case 1:
        return 'informational';
      case 2:
        return 'success';
      case 3:
        return 'redirection';
      case 4:
        return 'client-error';
      case 5:
        return 'server-error';
      default:
        return null;
    }
  }

  firstCipher(): number {
    return this.code ? parseInt(this.code.toString().substring(0, 1), 10) : null;
  }

}
