export function getCookie(key: string) {
  const b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

export function currencyFormat(amount: number) {
  return '€' + (amount / 100).toFixed(2);
}

export function dateFormat(date:string ) {
  return date.split('T')[0];
}


export const sleep = () => new Promise((resolver) => setTimeout(resolver, 500));
