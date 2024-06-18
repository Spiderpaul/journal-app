

export const fileUpload = async( file ) => {

    if( !file ) throw new Error( 'No se ha seleccionado ningún archivo' );

    const cloudUrl = 'https://api.cloudinary.com/v1_1/drt7tzxe8/upload';

    const formData = new FormData();
    formData.append( 'upload_preset', 'react-journal' );
    formData.append( 'file', file );
    
    try {

        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if ( !resp.ok ) throw new Error( 'No se pudo subir imagen' );

        const cloudResp = await resp.json();
        
        return cloudResp.secure_url; // Secure_url es el link de la imagen
        
    } catch (error) {
        console.log(error);
        throw new Error( error.message );
    }
}