//NOT MY ORIGINAL IDEA, I STARTING DOING IT IN A PREVIOUS POSITION, IT WAS THE IDEA OF THE LEAD OF THE TEAM,
// AND SINCE THAT MOMENT I HAVE BEEN USING IT IN MOST OF MY PROJECTS

export class UIComponent {

  static UI_BLANK = 'STATUS_BLANK';
  static UI_IDEAL = 'STATUS_IDEAL';
  static UI_PARTIAL = 'STATUS_PARTIAL';
  static UI_LOADING = 'STATUS_LOADING';
  static UI_ERROR = 'STATUS_ERROR';
  static UI_SUCCESS = 'STATUS_SUCCESS';

  protected uiStatus: string = UIComponent.UI_IDEAL;

  public isUIBlank(): boolean {
    return this.uiStatus === UIComponent.UI_BLANK;
  }

  public isUIIdeal(): boolean {
    return this.uiStatus === UIComponent.UI_IDEAL;
  }

  public isUIPartial(): boolean {
    return this.uiStatus === UIComponent.UI_PARTIAL;
  }

  public isUILoading(): boolean {
    return this.uiStatus === UIComponent.UI_LOADING;
  }

  public isUISuccess(): boolean {
    return this.uiStatus === UIComponent.UI_SUCCESS;
  }

  public isUIError(): boolean {
    return this.uiStatus === UIComponent.UI_ERROR;
  }

  public setUIBlank(): void {
    this.uiStatus = UIComponent.UI_BLANK;
  }

  public setUIIdeal(): void {
    this.uiStatus = UIComponent.UI_IDEAL;
  }

  public setUIPartial(): void {
    this.uiStatus = UIComponent.UI_PARTIAL;
  }

  public setUILoading(): void {
    this.uiStatus = UIComponent.UI_LOADING;
  }

  public setUISuccess(): void {
    this.uiStatus = UIComponent.UI_SUCCESS;
  }

  public setUIError(): void {
    this.uiStatus = UIComponent.UI_ERROR;
  }
}
