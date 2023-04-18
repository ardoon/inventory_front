import { TFunction } from 'next-i18next'
import MenuItem from "./menu-item";
import SubMenuItem from "./submenu-item";

type inputProps = {
    t: TFunction
}

export default function Sidebar(props: inputProps) {    

    return (
        <aside className='min-h-screen px-8 pt-16 pb-6 bg-slate-900 border-l-2 border-l-slate-900'>

            <div className='text-center pb-4'>

                <h4 className='text-tiny mb-3 text-slate-400'>{props.t('header.welcome')}</h4>

                <h2 className='text-2xl'>{props.t('header.title')}</h2>

            </div>

            <nav className='mt-16'>

                <ul className='space-y-4 text-lg text-sm'>

                    <MenuItem label={props.t('menu.label', { context: 'transactions' })} icon='arrow-left-right' link='/'>
                            
                            <SubMenuItem label={props.t('menu.transactions.label', { context: 'newEntry' })} link='/' />
                            <SubMenuItem label={props.t('menu.transactions.label', { context: 'entries' })} link='/' />
                            <SubMenuItem label={props.t('menu.transactions.label', { context: 'newOutput' })} link='/' />
                            <SubMenuItem label={props.t('menu.transactions.label', { context: 'outputs' })} link='/' />

                    </MenuItem>

                    <MenuItem label={props.t('menu.label', { context: 'reports' })} icon='card-heading' link='/'>
                            
                            <SubMenuItem label={props.t('menu.reports.label', { context: 'entry' })} link='/' />
                            <SubMenuItem label={props.t('menu.reports.label', { context: 'output' })} link='/' />
                            <SubMenuItem label={props.t('menu.reports.label', { context: 'amount' })} link='/' />
                            <SubMenuItem label={props.t('menu.reports.label', { context: 'cardex' })} link='/' />

                    </MenuItem>

                    <MenuItem label={props.t('menu.label', { context: 'products' })} icon='box' link='/'>
                            
                            <SubMenuItem label={props.t('menu.products.label', { context: 'newProduct' })} link='/' />
                            <SubMenuItem label={props.t('menu.products.label', { context: 'products' })} link='/' />
                            <SubMenuItem label={props.t('menu.products.label', { context: 'categories' })} link='/' />
                            <SubMenuItem label={props.t('menu.products.label', { context: 'units' })} link='/' />

                    </MenuItem>

                    <MenuItem label={props.t('menu.label', { context: 'parts' })} icon='buildings' link='/' />
                    <MenuItem label={props.t('menu.label', { context: 'warehouses' })} icon='columns-gap' link='/' />
                    <MenuItem label={props.t('menu.label', { context: 'users' })} icon='people' link='/' />

                </ul>

            </nav>

        </aside>
    )
}