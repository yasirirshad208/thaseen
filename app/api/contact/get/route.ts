import dbConnect from '@/lib/dbConnect';
import ContactModel from '@/models/Contact';

export async function GET(request: Request) {
    await dbConnect();

    try {
      



        const contacts = await ContactModel.find().sort({createdAt:-1})


        return Response.json(contacts, { status: 200 });
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Error fetching contacts',
                error
            },
            { status: 500 }
        );
    }
}