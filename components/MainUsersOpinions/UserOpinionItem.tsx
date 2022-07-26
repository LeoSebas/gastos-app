export default function UserOpinionItem({
                                            userName,
                                            stars,
                                            comment
                                        }: { userName: string, stars: number, comment: string }) {
    const StarsRow = ({stars}: { stars: number }) => {

        return <div className="flex justify-center">
            {
            }
        </div>
    }

    return <div className="rounded-xl bg-emerald-200">
        <h3>{userName}</h3>
        <StarsRow stars={stars}/>
        <p>{comment}</p>
    </div>
}