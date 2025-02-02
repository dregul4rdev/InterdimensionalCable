import Image from 'next/image'

import { ArrowDownBtn, ArrowUpBtn } from "../atoms/ArrowBtn"
import { IChannel } from '@/app/programming'


const ChannelControl = ({ channel, upArrowCallback, downArrowCallback }: { channel: IChannel, upArrowCallback: Function, downArrowCallback: Function }) => {

    return (
        <div className=" flex flex-col items-center ">
            <ArrowDownBtn onClick={upArrowCallback} />
            {channel.logoUrl ?
                <div className=''>
                    <Image width={125}
                        height={125} src={`/assets/${channel.logoUrl}`} alt="Picture of the author" />
                </div>
                :
                <h2 className="font-bold text-3xl text-gray-300 text-center">{channel.name}</h2>
            }
            <ArrowUpBtn onClick={downArrowCallback} />
        </div>)

}


export default ChannelControl