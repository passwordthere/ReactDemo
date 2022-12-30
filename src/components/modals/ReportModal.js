import Modal from 'react-bootstrap/Modal';
import './ReportModal.css'
import Links from "../../Links";

const ReportModal = ({show, hide, report}) => {

    return (
        <Modal className='ReportModal' fullscreen={true} size={'lg'} show={show} onHide={hide} backdrop="static" keyboard={false} centered>
            <div className='ReportModalHeader'>
                <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={hide}/>
            </div>

            <div className='ReportModalContent'>
                <iframe src={Links().patients + report + '#view=FitW&toolbar=0'} title={'Report'} height={'100%'} width={'100%'}/>
            </div>
        </Modal>
    );
};

export default ReportModal