
import  ChannelControl  from '../molecules/ChannelControl'

import { IChannel, IVideo } from '@/app/programming'


const DetailBar = ({channel, video, nextCallback,previusCallback }:{channel:IChannel, video:IVideo, nextCallback:Function,previusCallback:Function }) => {
  

    return (<div className=" z-50 flex grow-0 shrink-0   w-full flex-row   bg-gray-950 py-10">
        <div id="channelIcon" className="flex-auto  basis-1/5 px-20 items-center  border-r border-gray-800">
            <ChannelControl channel = {channel} upArrowCallback ={previusCallback}  downArrowCallback= {nextCallback}  />
        </div>
        <div id="channelDetails" className=" basis-3/5 flex-auto pl-10  ">
            <h2 className="font-bold text-3xl text-gray-300 my-2">{video.name}</h2>
            <p  className=" text-xl text-gray-500">{video.description.length > 200? `${video.description.substring(0,200)}...`:video.description}</p>
        </div>
        <div id="channelDetails" className=" basis-1/5 flex-auto pl-10  ">
        <a href='https://ko-fi.com/Q5Q71BDVV5' className=" fixed right-0 p-5" target='_blank'><img height='36' className=" h-10 border-none"  src='https://storage.ko-fi.com/cdn/kofi5.png?v=6'  alt='Buy Me a Coffee at ko-fi.com' /></a>
        </div>
    </div>)
}
export default DetailBar