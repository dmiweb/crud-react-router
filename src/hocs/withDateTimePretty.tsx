import { useEffect, useState } from "react";
import getSinceDateTime from "../utils/getSinceDateTime";

type P = {
  date: string
}

const withDateTimePretty = (Component: React.ComponentType<P>): React.ComponentType<P> => {
  const ConvertDate = ({ date }: { date: string }) => {
    const [sinceDateTime, setSinceDateTime] = useState<string>(getSinceDateTime(date));

    useEffect(() => {
      const intervalId = setInterval(() => {
        setSinceDateTime(getSinceDateTime(date));
      }, 1000 * 60);

      return () => clearInterval(intervalId);
    }, [date]);

    return <Component date={sinceDateTime} />
  }

  return ConvertDate;
}

export default withDateTimePretty;