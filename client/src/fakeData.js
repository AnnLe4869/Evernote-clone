export default {
  users: [
    {
      id: "us1",
      notebooks: ["nb01", "nb02"],
      allowedProperties: [
        {
          id: "nb03",
          type: "notebook",
          allowedRead: true,
          allowedWrite: false,
        },
        {
          id: "no09",
          type: "note",
          allowedRead: true,
          allowedWrite: true,
        },
      ],
    },
    {
      id: "us2",
      notebooks: ["nb03", "nb04"],
      allowedProperties: [
        {
          id: "nb01",
          type: "notebook",
          allowedRead: true,
          allowedWrite: true,
        },
        {
          id: "no05",
          type: "note",
          allowedRead: true,
          allowedWrite: false,
        },
      ],
    },
  ],
  notebooks: [
    { id: "nb01", notes: ["no01", "no02", "no03"], user: "us1" },
    { id: "nb02", notes: ["no04", "no05", "no06"], user: "us1" },
    { id: "nb03", notes: ["no07", "no08"], user: "us2" },
    { id: "nb04", notes: ["no09", "no10", "no11"], user: "us2" },
  ],
  notes: [
    {
      id: "no01",
      content: "Hello world from no01",
      isInTrash: false,
      isInShortcut: false,
      creator: "us1",
      folder: "nb1",
      authorizedUsers: ["us2"],
      editAt: "Thu, 09 Jul 2020 02:24:21 GMT",
    },
    {
      id: "no02",
      content: "Hello world from no01",
      isInTrash: false,
      isInShortcut: false,
      creator: "us1",
      folder: "nb1",
      authorizedUsers: ["us2"],
      editAt: "Thu, 09 Jul 2020 02:24:40 GMT",
    },
    {
      id: "no03",
      content: "Hello world from no01",
      isInTrash: false,
      isInShortcut: true,
      creator: "us1",
      folder: "nb1",
      authorizedUsers: ["us2"],
      editAt: "Thu, 09 Jul 2020 03:24:21 GMT",
    },
    {
      id: "no04",
      content: "Hello world from no01",
      isInTrash: false,
      isInShortcut: false,
      creator: "us1",
      folder: "nb2",
      authorizedUsers: [],
      editAt: "Thu, 09 Jul 2020 02:44:21 GMT",
    },
    {
      id: "no05",
      content: "Hello world from no01",
      isInTrash: true,
      isInShortcut: true,
      creator: "us1",
      folder: "nb2",
      authorizedUsers: ["us2"],
      editAt: "Thu, 09 Jul 2020 02:54:21 GMT",
    },
    {
      id: "no06",
      content: "Hello world from no06",
      isInTrash: false,
      isInShortcut: false,
      creator: "us1",
      folder: "nb2",
      authorizedUsers: [],
      editAt: "Thu, 04 Jul 2020 02:24:21 GMT",
    },
    {
      id: "no07",
      content: "Hello world from no06",
      isInTrash: false,
      isInShortcut: false,
      creator: "us2",
      folder: "nb3",
      authorizedUsers: ["us1"],
      editAt: "Thu, 09 Jul 2020 12:24:21 GMT",
    },
    {
      id: "no08",
      content: "Hello world from no06",
      isInTrash: false,
      isInShortcut: false,
      creator: "us2",
      folder: "nb3",
      authorizedUsers: ["us1"],
      editAt: "Thu, 09 Jul 2020 02:24:46 GMT",
    },
    {
      id: "no09",
      content: "Hello world from no06",
      isInTrash: false,
      isInShortcut: false,
      creator: "us2",
      folder: "nb4",
      authorizedUsers: ["us1"],
      editAt: "Thu, 09 Jun 2020 02:24:21 GMT",
    },
    {
      id: "no10",
      content: "Hello world from no06",
      isInTrash: false,
      isInShortcut: false,
      creator: "us2",
      folder: "nb4",
      authorizedUsers: [],
      editAt: "Thu, 09 Jul 2021 02:24:21 GMT",
    },
    {
      id: "no11",
      content: "Hello world from no06",
      isInTrash: false,
      isInShortcut: false,
      creator: "us2",
      folder: "nb4",
      authorizedUsers: [],
      editAt: "Thu, 09 Jul 2020 02:25:21 GMT",
    },
  ],
};