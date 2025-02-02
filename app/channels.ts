

const channels:Array<IChannelDefinition> = [
    {
        name: "ISPN Fight",
        description: "ISPN Fight",
        logoUrl: "ISPN.png",
        channelType: "video",
        searchTxt: ["carjitsu","chess boxing","Extreme Ironing Championships", "Toe Wrestling   Championships"],
        includeVideoId: []
     },
    {
        name: "NON-NPC",
        description: "NON-NPC",
        logoUrl: "non-npc2.png",
        channelType: "video",
        searchTxt: ["Oblivion NPC Conversation","Oblivion NPC Dialogue"],
        includeVideoId: []
    },
    {
        name: "n3ws",
        description: "n3ws",
        logoUrl: "n3ws.png",
        channelType: "video",
        searchTxt: ["pseudo-documentary", "Who Is America?"],
        includeVideoId: []
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
        searchTxt: ["Joan Cornellà"],
        includeVideoId: []
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
        includeVideoId: []
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
        searchTxt: ["Philomena Cunk's",],
        includeVideoId: []
    },
    {
        name: "Commercials",
        description: "",
        logoUrl: "",
        channelType: "video",
        searchTxt: ["JAPANESE COMMERCIAL", "Orocan"],
        includeVideoId: []
    },
    {
        name: "WithDOOM",
        description: "",
        logoUrl: "",
        channelType: "video",
        searchTxt: ["When the DOOM music kicks in"],
        includeVideoId: []
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
