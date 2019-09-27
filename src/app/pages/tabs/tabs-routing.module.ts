import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);
const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children:
            [
                {
                    path: 'favorite',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: '../favorite/favorite.module#FavoritePageModule',
                                // ...canActivate(redirectUnauthorizedToLogin)
                            }
                        ]
                },
                {
                    path: 'maps',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: '../maps/maps.module#MapsPageModule',
                                // ...canActivate(redirectUnauthorizedToLogin)
                            }
                        ]
                },
                {
                    path: 'home',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: '../home/home.module#HomePageModule'
                                // ...canActivate(redirectUnauthorizedToLogin)
                            }
                        ]
                },
                {
                    path: '',
                    redirectTo: '/tabs/home',
                    pathMatch: 'full'
                }
            ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports:
        [
            RouterModule.forChild(routes)
        ],
    exports:
        [
            RouterModule
        ]
})
export class TabsPageRoutingModule { }