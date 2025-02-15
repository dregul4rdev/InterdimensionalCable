

const channels:Array<IChannelDefinition> = [
    {
        name: "ISPN Fight",
        description: "ISPN Fight",
        logoUrl: "ISPN.png",
        channelType: "video",
        searchTxt: ["carjitsu","chess boxing","Extreme Ironing"],
        includeVideoId: []
     },
    {
        name: "NON-NPC",
        description: "NON-NPC",
        logoUrl: "non-npc2.png",
        channelType: "video",
        searchTxt: ["Oblivion NPC Conversation"],
        includeVideoId: []
    },
    {
        name: "n3ws",
        description: "n3ws",
        logoUrl: "n3ws.png",
        channelType: "video",
        searchTxt: [""],
        includeVideoId: ["83UnO-b8XUM"]
    },
    {
        name: "Min",
        description: "Music internet",
        logoUrl: "min.png",
        channelType: "video",
        searchTxt: ["pogo Wonderland", "SLOW REVERB", "Synthwave Remix"],
        includeVideoId: []
    },
    {
        name: "WTFDIJW",
        description: "What the fuck did i just watch?",
        logoUrl: "wtfdijw.png",
        channelType: "video",
        searchTxt: [],
        includeVideoId: ["lrALS1vLaSA","il2j3K_G4PE","WWvK5VLQrno&t"]
    },

    {
        name: "Church Fither",
        description: "",
        logoUrl: "CF.png",
        channelType: "video",
        searchTxt: ["street fighter pastores"],
        includeVideoId: []
    },

    {
        name: "synthwave",
        description: "synthwave Channel",
        logoUrl: "",
        channelType: "video",
        searchTxt: ["synthwave"],
        includeVideoId: ["RECawNrkABI","Y4FrnrD7jCA","9RHFFeQ2tu4"]
    },
    {
        name: "Moovis",
        description: "",
        logoUrl: "",
        channelType: "video",
        searchTxt: ["DROLE FACTORY",],
        includeVideoId: []
    },
    {
        name: "UnHistory Channel",
        description: "",
        logoUrl: "",
        channelType: "video",
        searchTxt: ["philomena cunk moments of wonder",],
        includeVideoId: ["7-KpbD_RnPs&"]
    },
    {
        name: "Commercials",
        description: "",
        logoUrl: "",
        channelType: "video",
        searchTxt: ["JAPANESE COMMERCIAL", ],
        includeVideoId: ['8YabenjHy8c']
    },
    {
        name: "WithDOOM",
        description: "",
        logoUrl: "",
        channelType: "video",
        searchTxt: ["with doom music"],
        includeVideoId: []
    },

    {
        name: "ShowShow",
        description: "",
        logoUrl: "",
        channelType: "video",
        searchTxt: [],
        includeVideoId: ["gKQHGnlCvzI"]
    },
    {
        name: "Real video Music",
        description: "",
        logoUrl: "",
        channelType: "video",
        searchTxt: [],
        includeVideoId: ["z_mUo5Zg-GM","eWBYDJbqh-c","Am7kr_lLbsw", "lckf6aOA0Ps"]
    },

    {
        name: "interdimensinal broadcast",
        description: "",
        logoUrl: "",
        channelType: "video",
        searchTxt: ["[Mock Broadcast]"],
        includeVideoId: []
    },

    {
        name: "the Art Channel",
        description: "",
        logoUrl: "",
        channelType: "video",
        searchTxt: [],
        includeVideoId: ["xKAkmHIV3vs","xo10F9IBGRk","bYgZ1ppusbs","5SRpUv62Dh0"]
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
}
