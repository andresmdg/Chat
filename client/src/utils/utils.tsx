export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setter: (value: string) => void
) => {
  e.preventDefault();
  setter(e.target.value);
};

export function handleActive(value: boolean, setter: (value: boolean) => void) {
  setter(!value);
}

export const messages = [
  {
    name: "Garcia",
    date: "1989-05-18T17:32:28.233Z",
    msnAccount: "50",
  },
  {
    name: "Haley",
    date: "1971-05-26T17:16:41.081Z",
    msnAccount: "50",
  },
  {
    name: "Claudia",
    date: "2009-07-28T01:54:58.777Z",
    msnAccount: "50",
  },
  {
    name: "Flynn",
    date: "1970-10-30T11:37:06.668Z",
    msnAccount: "50",
  },
  {
    name: "Melisa",
    date: "1980-09-29T20:59:02.783Z",
    msnAccount: "50",
  },
  {
    name: "Christa",
    date: "1994-04-07T00:22:37.179Z",
    msnAccount: "50",
  },
  {
    name: "Samantha",
    date: "2000-08-25T00:17:53.490Z",
    msnAccount: "50",
  },
  {
    name: "Nichols",
    date: "2021-12-05T05:22:16.434Z",
    msnAccount: "50",
  },
  {
    name: "Sampson",
    date: "1991-01-20T05:53:43.318Z",
    msnAccount: "50",
  },
  {
    name: "Mayer",
    date: "2006-02-17T23:45:20.631Z",
    msnAccount: "50",
  },
  {
    name: "Kitty",
    date: "1974-04-11T13:36:16.704Z",
    msnAccount: "50",
  },
  {
    name: "Flores",
    date: "2016-01-23T06:40:27.936Z",
    msnAccount: "50",
  },
  {
    name: "Dillon",
    date: "1980-03-26T08:47:06.245Z",
    msnAccount: "50",
  },
  {
    name: "Evangeline",
    date: "2024-07-25T19:08:08.682Z",
    msnAccount: "50",
  },
  {
    name: "Peters",
    date: "2013-04-28T02:10:23.043Z",
    msnAccount: "50",
  },
  {
    name: "Woodard",
    date: "1990-12-11T19:16:09.313Z",
    msnAccount: "50",
  },
  {
    name: "Holder",
    date: "2021-07-27T20:01:42.988Z",
    msnAccount: "50",
  },
  {
    name: "Fry",
    date: "2001-08-09T09:04:45.197Z",
    msnAccount: "50",
  },
  {
    name: "Kristie",
    date: "1983-08-18T11:46:28.682Z",
    msnAccount: "50",
  },
  {
    name: "Galloway",
    date: "1989-06-28T16:07:17.468Z",
    msnAccount: "50",
  },
  {
    name: "Manning",
    date: "2006-03-14T06:24:25.654Z",
    msnAccount: "50",
  },
  {
    name: "Bernard",
    date: "1986-10-06T20:06:41.396Z",
    msnAccount: "50",
  },
  {
    name: "Regina",
    date: "2008-09-05T08:08:23.996Z",
    msnAccount: "50",
  },
  {
    name: "Amy",
    date: "2023-04-06T02:39:32.190Z",
    msnAccount: "50",
  },
  {
    name: "Gibbs",
    date: "2013-10-31T15:05:48.719Z",
    msnAccount: "50",
  },
  {
    name: "Conrad",
    date: "2009-06-19T20:34:18.340Z",
    msnAccount: "50",
  },
  {
    name: "Emerson",
    date: "2015-05-31T10:24:06.856Z",
    msnAccount: "50",
  },
  {
    name: "Hope",
    date: "2000-09-15T00:58:41.588Z",
    msnAccount: "50",
  },
  {
    name: "Katrina",
    date: "1998-12-28T12:32:39.320Z",
    msnAccount: "50",
  },
  {
    name: "Jocelyn",
    date: "2017-08-26T03:50:37.562Z",
    msnAccount: "50",
  },
];
