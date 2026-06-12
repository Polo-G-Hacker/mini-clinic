import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('clinic_token');
  // Add token to absolute URLs (API calls) or URLs containing /api/
  const isApiRequest = request.url.startsWith('http') || request.url.includes('/api/');
  
  if (!token || !isApiRequest) {
    return next(request);
  }
  return next(request.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  }));
};
