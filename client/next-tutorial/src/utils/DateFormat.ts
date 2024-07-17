const DateFormat = (date: Date, IntlOption: Intl.DateTimeFormatOptions) => {
  const newDate = new Date(date);

  return new Intl.DateTimeFormat("ko", IntlOption).format(newDate);
};

export default DateFormat;
