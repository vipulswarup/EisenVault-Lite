import React from 'react';
import Iframe from 'react-iframe';

const documentsPreview = () => {
return(
<Iframe name='myFrame'
    src='https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
>
</Iframe>
)
}

export default documentsPreview;