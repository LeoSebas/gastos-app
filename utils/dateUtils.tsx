


export function getMonth(monthNumber:number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('es-AR', {
      month: 'long',
    });
  }