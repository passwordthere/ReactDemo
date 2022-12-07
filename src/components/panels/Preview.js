import './Preview.css'
import black from '../../assets/image/black.png'
import {BulbOutlined} from '@ant-design/icons';

const Preview = ({currentStatus}) => {
    return (
        <div className='Preview'>
            <div className='ODOSPreview'>
                <div className='ODOSPreviewHeader'>OD</div>
                <div className='ODOSPreviewContent'>
                    <img style={{width: '100%', height: '100%'}} src={black} />
                    {/*<div style={{background: 'black', width: '100%', height: '100%'}}/>*/}
                </div>
            </div>
            <div className='ODOSPreview'>
                <div className='ODOSPreviewHeader'>OS</div>
                <div className='ODOSPreviewContent'>
                    <img style={{width: '100%', height: '100%'}} src={black} />
                    {/*<div style={{background: 'black', width: '100%', height: '100%'}}/>*/}
                </div>
            </div>
            <div className='FooterPreview'>
                {currentStatus === 'locating' ? (
                    <div className='FooterPressure'>
                        <div className='FooterPressureHeader'>眼角压力</div>
                        <div className='FooterPressureContent'>
                            <div style={{background: 'black', width: '100%', height: '100%'}}/>
                        </div>
                    </div>
                ) : (
                    <div className='FooterTag'>
                        <div className='FooterTagHeader'><BulbOutlined/> Tips：双击图像区域重拍</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Preview