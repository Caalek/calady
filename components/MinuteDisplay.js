export default function MinuteDisplay({ style, seconds }) {
  const getMinutes = (seconds) => {
    return Math.floor(seconds / 60);
  };

  const zfill = (n) => {
    if (n < 10) {
      return "0" + n;
    }
    return n;
  };
  return (
    <>
      {zfill(getMinutes(seconds))}:{zfill(seconds - getMinutes(seconds) * 60)}
    </>
  );
}
