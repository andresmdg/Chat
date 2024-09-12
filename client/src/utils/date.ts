import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/es';

dayjs.extend(calendar);
dayjs.extend(updateLocale)
dayjs.locale('es');

export default function formatTime (date: Date) {
  return dayjs(date).calendar(null, {
    sameDay: "h:mm A", // 2:30 AM
    lastDay: "[Ayer]", // Ayer
    lastWeek: "dddd", // martes
    sameElse: "DD/MM/YYYY", // 05/09/2024
  });
}