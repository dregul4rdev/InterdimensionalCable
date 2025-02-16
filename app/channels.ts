

const channels:Array<IChannelDefinition> = [
    {
        name: "ISPN Fight",
        description: "ISPN Fight",
        logoUrl: "ISPN.png",
        channelType: "video",
        searchTxt: [],
        includeVideoId: ["yB9l6rODUSs"],
        includedPlaylistIds: ["PLpryvTA9UnRaynRUgd6kJ735VEdTdfdzQ","PLDNv41WjI5T72onzwdEh0_eRieYeVanZG","PLG5O5LcjpZRkaQDm5bvk5wv9SujbaHt-T"]
    },
    {
        name: "NON-NPC",
        description: "NON-NPC",
        logoUrl: "non-npc2.png",
        channelType: "video",
        searchTxt: [],
        includeVideoId: [],
        includedPlaylistIds: ["PLZ_BSXRPXtr1GkWSqdPUR_IuX5m9vWalS","PLE41-TI1Bz_W6Jf5etglXsaqV7O9QEfzv"]
    },
    {
        name: "n3ws",
        description: "n3ws",
        logoUrl: "n3ws.png",
        channelType: "video",
        searchTxt: [""],
        includeVideoId: ["83UnO-b8XUM"],
        includedPlaylistIds: []
    },
    {
        name: "Min",
        description: "Music internet",
        logoUrl: "min.png",
        channelType: "video",
        searchTxt: [ "SLOW REVERB", "Synthwave Remix"],
        includeVideoId: [],
        includedPlaylistIds: ["PL99E0036D14E8B058"]
    },
    {
        name: "WTFDIJW",
        description: "What the fuck did i just watch?",
        logoUrl: "wtfdijw.png",
        channelType: "video",
        searchTxt: [],
        includeVideoId: ["lrALS1vLaSA", "il2j3K_G4PE", "WWvK5VLQrno&t"],
        includedPlaylistIds: ["PL8Q1hAYWTz_-qDFcQNM2ixvk91mY3ENc3","PLVJhB7LDgNqLeoc8OLHpSFpg8J5HhaRia","PLtdJnn6SWovDbNkNL33tLGqvx9RMi-O68"]
    },

    {
        name: "Church Fither",
        description: "",
        logoUrl: "CF.png",
        channelType: "video",
        searchTxt: ["street fighter pastores"],
        includeVideoId: [],
        includedPlaylistIds: ["PLrQN6-yIDpUOlHR06FSg4vAezAIfmxr5Z"]
    },

    {
        name: "synthwave",
        description: "synthwave Channel",
        logoUrl: "",
        channelType: "video",
        searchTxt: ["synthwave"],
        includeVideoId: ["RECawNrkABI", "Y4FrnrD7jCA", "9RHFFeQ2tu4"],
        includedPlaylistIds: []
    },
    {
        name: "Moovis",
        description: "",
        logoUrl: "",
        channelType: "video",
        searchTxt: ["DROLE FACTORY",],
        includeVideoId: [],
        includedPlaylistIds: []
    },
    {
        name: "UnHistory Channel",
        description: "",
        logoUrl: "",
        channelType: "video",
        searchTxt: [],
        includeVideoId: ["7-KpbD_RnPs&"],
        includedPlaylistIds: ["PLAHuYkmCmARf_GCrQb2IScaD3C4dpuSRm","PLZ8c54cxQG2EbsMCpbX0wVmi71Z4jJ-4n"]
    },
    {
        name: "Commercials",
        description: "",
        logoUrl: "",
        channelType: "video",
        searchTxt: ["JAPANESE COMMERCIAL",],
        includeVideoId: ['8YabenjHy8c'],
        includedPlaylistIds: ["PLl8NyjRVICgYpZam4yy42ONhb31_x8edh"]
    },
    {
        name: "WithDOOM",
        description: "",
        logoUrl: "",
        channelType: "video",
        searchTxt: ["with doom music"],
        includeVideoId: [],
        includedPlaylistIds: ["PLd7aaulDH-Yg38TDdYNtc_5tmEpk96B-7"]
    },

    {
        name: "ShowShow",
        description: "",
        logoUrl: "",
        channelType: "video",
        searchTxt: [],
        includeVideoId: ["gKQHGnlCvzI","Za2FVIo25kA"],
        includedPlaylistIds: []
    },
    {
        name: "Real video Music",
        description: "",
        logoUrl: "",
        channelType: "video",
        searchTxt: [],
        includeVideoId: ["z_mUo5Zg-GM", "eWBYDJbqh-c", "Am7kr_lLbsw", "lckf6aOA0Ps","yBLdQ1a4-JI"],
        includedPlaylistIds: []
    },

    {
        name: "interdimensinal broadcast",
        description: "",
        logoUrl: "",
        channelType: "video",
        searchTxt: ["[Mock Broadcast]"],
        includeVideoId: [],
        includedPlaylistIds: []
    },

    {
        name: "the Art Channel",
        description: "",
        logoUrl: "",
        channelType: "video",
        searchTxt: [],
        includeVideoId: ["xKAkmHIV3vs", "xo10F9IBGRk", "bYgZ1ppusbs", "5SRpUv62Dh0"],
        includedPlaylistIds: []
    },

    

]

export default channels;

export interface IChannelDefinition {
    name: string,
    description: string,
    logoUrl: string,
    channelType: string,
    searchTxt: Array<string>,
    includeVideoId: Array<string>,
    includedPlaylistIds: Array<string>,
}
