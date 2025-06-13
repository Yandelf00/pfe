type NoDataProps = {
    text : string,
}

export default function NoData({ text } : NoData)
{
    return(
        <section className="h-full w-full flex justify-center items-center">
            <p className="font-semibold text-gray-700">{text}</p>
        </section>
    )
}
