import { TFunction } from 'next-i18next'
import { useRouter } from 'next/router';
import MenuItem from "./menu-item";

type inputProps = {
    t: TFunction
}

export default function Sidebar(props: inputProps) {   
    
    const router = useRouter();
    let logoutIcon = router.locale === 'en' ? 'box-arrow-left' : 'box-arrow-right';

    return (
        <aside className='min-h-screen px-8 pt-16 pb-6 bg-slate-900 border-l-2 border-l-slate-900'>

            <div className='text-center pb-4'>

                <h4 className='text-sm mb-3 text-gray-400'>{props.t('header.welcome')}</h4>

                <h2 className='text-3xl'>{props.t('header.title')}</h2>

            </div>

            <nav className='mt-16'>

                <ul className='space-y-4 text-lg'>

                    <MenuItem label={props.t('menu.label', { context: 'transactions' })} icon='arrow-left-right' link='/dashboard/transactions' />

                    <MenuItem label={props.t('menu.label', { context: 'reports' })} icon='card-heading' link='/' />

                    <MenuItem label={props.t('menu.label', { context: 'products' })} icon='box' link='/dashboard/products' />

                    {/* <MenuItem label={props.t('menu.label', { context: 'products' })} icon='box' link='/dashboard/products'>
                            
                            <SubMenuItem label={props.t('menu.products.label', { context: 'newProduct' })} link='/' />
                            <SubMenuItem label={props.t('menu.products.label', { context: 'products' })} link='/dashboard/products' />
                            <SubMenuItem label={props.t('menu.products.label', { context: 'categories' })} link='/' />
                            <SubMenuItem label={props.t('menu.products.label', { context: 'units' })} link='/' />

                    </MenuItem> */}

                    <MenuItem label={props.t('menu.label', { context: 'parts' })} icon='buildings' link='/dashboard/sections' />
                    <MenuItem label={props.t('menu.label', { context: 'warehouses' })} icon='columns-gap' link='/dashboard/warehouses' />
                    <MenuItem label={props.t('menu.label', { context: 'users' })} icon='people' link='/dashboard/users' />
                    <MenuItem label={props.t('menu.label', { context: 'logout' })} icon={logoutIcon} link='/logout' />

                </ul>

            </nav>

        </aside>
    )
}