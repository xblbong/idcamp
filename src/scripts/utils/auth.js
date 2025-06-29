import { getActiveRoute } from "../routes/url-parser";
import CONFIG from "../config";

const ACCESS_TOKEN_KEY = CONFIG.ACCESS_TOKEN_KEY || "dicoding-token";

export function getAccessToken() {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    return accessToken === "null" || accessToken === "undefined" ? null : accessToken;
  } catch (error) {
    console.error("getAccessToken error:", error);
    return null;
  }
}

export function setAccessToken(token) {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    return true;
  } catch (error) {
    console.error("setAccessToken error:", error);
    return false;
  }
}

export function removeAccessToken() {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    return true;
  } catch (error) {
    console.error("removeAccessToken error:", error);
    return false;
  }
}

export function isLoggedIn() {
  return !!getAccessToken(); 
}

export function logout() {
  removeAccessToken();
  window.location.hash = "#/"; 
}

const unauthenticatedRoutesOnly = ["#/", "#/register"];

export function checkUnauthenticatedRouteOnly(page) {
  const url = getActiveRoute();
  if (unauthenticatedRoutesOnly.includes(url) && isLoggedIn()) {
    window.location.hash = "#/";
    return null;
  }
  return page;
}

export function checkAuthenticatedRoute(page) {
  if (!isLoggedIn()) {
    window.location.hash = "#/"; 
    return null;
  }
  return page;
}

export function setIsLoggedIn(status) {
  localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
}

export function clearAuth() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('isLoggedIn');
}