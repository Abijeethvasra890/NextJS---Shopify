export async function GET(req, {params}){
    try{
        return Response.json("hi");
    }catch(err){
        return Response.json({message: err.message});
    }
}