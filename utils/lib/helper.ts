export function toTitleCase(str:string) {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}


export function formatToIST(isoString: string): string {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    weekday: "short", // Tue
    day: "numeric",   // 3
    month: "short",   // Jun
    hour: "numeric",  // 7
    minute: "2-digit",
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const parts = formatter.formatToParts(date);

  const getValue = (type: string): string => {
    const part = parts.find(p => p.type === type);
    return part ? part.value : "";
  };

  const month = getValue("month").toUpperCase();   // JUN
  const weekday = getValue("weekday").toUpperCase(); // TUE
  const day = getValue("day");                       // 3
  const hour = getValue("hour");
  const minute = getValue("minute");
  const dayPeriod = getValue("dayPeriod").toUpperCase(); // AM / PM

  return `${toTitleCase(weekday)}, ${toTitleCase(day)} ${toTitleCase(month)}`;
}
