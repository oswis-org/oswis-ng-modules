import {Injectable} from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class TokenStorageService {
  private itemName = 'currentUser';
  private itemNameRefresh = 'currentUserRefresh';

  public storeToken(token: string): void {
    localStorage.setItem(this.itemName, token);
  }

  public loadToken(): string {
    const actualToken = localStorage.getItem(this.itemName);
    return !actualToken || actualToken.length === 0 ? null : actualToken;
  }

  public removeToken(): void {
    localStorage.setItem(this.itemName, null);
    localStorage.removeItem(this.itemName);
  }

  public storeRefreshToken(token: string) {
    localStorage.setItem(this.itemNameRefresh, token);
  }

  public loadRefreshToken(): string {
    const actualToken = localStorage.getItem(this.itemNameRefresh);
    return !actualToken || actualToken.length === 0 ? null : actualToken;
  }

  public removeRefreshToken(): void {
    localStorage.setItem(this.itemNameRefresh, null);
    localStorage.removeItem(this.itemNameRefresh);
  }
}
