function msToTime(duration, progressBarTime) {
   var minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
      // milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60);
   // hours = hours < 10 ? "0" + hours : hours;

   if (progressBarTime) {
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return `${minutes}:${seconds}`;
   }
   return hours !== 0 ? `${hours} giờ ${minutes} phút` : `${minutes} phút`;
}
export { msToTime };
