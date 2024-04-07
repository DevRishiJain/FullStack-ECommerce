export default function userListPage({params}:any){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Lists</h1>
            <hr />
            <p className="text-4xl">lists of {params.id}</p>
        </div>
    )
}