
export const FormatDate = (data:string)=> {
  const newDate = new Date(data)
  const day = newDate.getDate();
  const  month = newDate.getMonth()+1
  const year = newDate.getFullYear();
  return `${day}/${month}/${year}`

}

export const formatVND = (amount: number): string =>{
  const formattedAmount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  return formattedAmount.replace(/\./g, ',');
}