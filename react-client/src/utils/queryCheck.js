export default function checkQuery(response) {
  if(response.ok) {
    alert("Ваша заявка отправлена!");
  }else {
    alert('Что-то пошло не так, повторите запрос позднее');
  }
}