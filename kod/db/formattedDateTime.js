function getFormattedDateTime() {
    const today = new Date();
  
    const formattedDateTime = new Intl.DateTimeFormat('hr-HR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(today);
  
    return formattedDateTime;
  }
 
module.exports = getFormattedDateTime;
  