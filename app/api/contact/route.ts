import dbConnect from '@/lib/dbConnect';
import ContactModel from '@/models/Contact';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const {
            name,
            email,
            phone,
            subject,
            message
        } = await request.json();



        const newContact = new ContactModel({
            name,
            email,
            phone,
            subject,
            message
        });

        await newContact.save();


        return Response.json(
            {
                success: true,
                message: 'Contact created successfully',
            },
            { status: 201 }
        );
    } catch (error) {
        console.log(error)
        return Response.json(
            {
                success: false,
                message: 'Error adding contact',
                error
            },
            { status: 500 }
        );
    }
}