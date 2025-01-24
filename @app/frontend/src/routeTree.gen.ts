/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as MainImport } from './routes/main'
import { Route as LoginImport } from './routes/login'
import { Route as LabsImport } from './routes/labs'
import { Route as ChangePasswordImport } from './routes/change-password'
import { Route as IndexImport } from './routes/index'
import { Route as StockIndexImport } from './routes/stock/index'
import { Route as PatientsIndexImport } from './routes/patients/index'
import { Route as VisitsVisitIdImport } from './routes/visits/$visitId'
import { Route as StockStockItemIdImport } from './routes/stock/$stockItemId'
import { Route as PatientsNewImport } from './routes/patients/new'
import { Route as PatientsPatientIdIndexImport } from './routes/patients/$patientId/index'
import { Route as PatientsPatientIdVisitsIndexImport } from './routes/patients/$patientId/visits/index'
import { Route as PatientsPatientIdVisitsNewImport } from './routes/patients/$patientId/visits/new'
import { Route as PatientsPatientIdVisitsVisitIdImport } from './routes/patients/$patientId/visits/$visitId'

// Create/Update Routes

const MainRoute = MainImport.update({
  id: '/main',
  path: '/main',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const LabsRoute = LabsImport.update({
  id: '/labs',
  path: '/labs',
  getParentRoute: () => rootRoute,
} as any)

const ChangePasswordRoute = ChangePasswordImport.update({
  id: '/change-password',
  path: '/change-password',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const StockIndexRoute = StockIndexImport.update({
  id: '/stock/',
  path: '/stock/',
  getParentRoute: () => rootRoute,
} as any)

const PatientsIndexRoute = PatientsIndexImport.update({
  id: '/patients/',
  path: '/patients/',
  getParentRoute: () => rootRoute,
} as any)

const VisitsVisitIdRoute = VisitsVisitIdImport.update({
  id: '/visits/$visitId',
  path: '/visits/$visitId',
  getParentRoute: () => rootRoute,
} as any)

const StockStockItemIdRoute = StockStockItemIdImport.update({
  id: '/stock/$stockItemId',
  path: '/stock/$stockItemId',
  getParentRoute: () => rootRoute,
} as any)

const PatientsNewRoute = PatientsNewImport.update({
  id: '/patients/new',
  path: '/patients/new',
  getParentRoute: () => rootRoute,
} as any)

const PatientsPatientIdIndexRoute = PatientsPatientIdIndexImport.update({
  id: '/patients/$patientId/',
  path: '/patients/$patientId/',
  getParentRoute: () => rootRoute,
} as any)

const PatientsPatientIdVisitsIndexRoute =
  PatientsPatientIdVisitsIndexImport.update({
    id: '/patients/$patientId/visits/',
    path: '/patients/$patientId/visits/',
    getParentRoute: () => rootRoute,
  } as any)

const PatientsPatientIdVisitsNewRoute = PatientsPatientIdVisitsNewImport.update(
  {
    id: '/patients/$patientId/visits/new',
    path: '/patients/$patientId/visits/new',
    getParentRoute: () => rootRoute,
  } as any,
)

const PatientsPatientIdVisitsVisitIdRoute =
  PatientsPatientIdVisitsVisitIdImport.update({
    id: '/patients/$patientId/visits/$visitId',
    path: '/patients/$patientId/visits/$visitId',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/change-password': {
      id: '/change-password'
      path: '/change-password'
      fullPath: '/change-password'
      preLoaderRoute: typeof ChangePasswordImport
      parentRoute: typeof rootRoute
    }
    '/labs': {
      id: '/labs'
      path: '/labs'
      fullPath: '/labs'
      preLoaderRoute: typeof LabsImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/main': {
      id: '/main'
      path: '/main'
      fullPath: '/main'
      preLoaderRoute: typeof MainImport
      parentRoute: typeof rootRoute
    }
    '/patients/new': {
      id: '/patients/new'
      path: '/patients/new'
      fullPath: '/patients/new'
      preLoaderRoute: typeof PatientsNewImport
      parentRoute: typeof rootRoute
    }
    '/stock/$stockItemId': {
      id: '/stock/$stockItemId'
      path: '/stock/$stockItemId'
      fullPath: '/stock/$stockItemId'
      preLoaderRoute: typeof StockStockItemIdImport
      parentRoute: typeof rootRoute
    }
    '/visits/$visitId': {
      id: '/visits/$visitId'
      path: '/visits/$visitId'
      fullPath: '/visits/$visitId'
      preLoaderRoute: typeof VisitsVisitIdImport
      parentRoute: typeof rootRoute
    }
    '/patients/': {
      id: '/patients/'
      path: '/patients'
      fullPath: '/patients'
      preLoaderRoute: typeof PatientsIndexImport
      parentRoute: typeof rootRoute
    }
    '/stock/': {
      id: '/stock/'
      path: '/stock'
      fullPath: '/stock'
      preLoaderRoute: typeof StockIndexImport
      parentRoute: typeof rootRoute
    }
    '/patients/$patientId/': {
      id: '/patients/$patientId/'
      path: '/patients/$patientId'
      fullPath: '/patients/$patientId'
      preLoaderRoute: typeof PatientsPatientIdIndexImport
      parentRoute: typeof rootRoute
    }
    '/patients/$patientId/visits/$visitId': {
      id: '/patients/$patientId/visits/$visitId'
      path: '/patients/$patientId/visits/$visitId'
      fullPath: '/patients/$patientId/visits/$visitId'
      preLoaderRoute: typeof PatientsPatientIdVisitsVisitIdImport
      parentRoute: typeof rootRoute
    }
    '/patients/$patientId/visits/new': {
      id: '/patients/$patientId/visits/new'
      path: '/patients/$patientId/visits/new'
      fullPath: '/patients/$patientId/visits/new'
      preLoaderRoute: typeof PatientsPatientIdVisitsNewImport
      parentRoute: typeof rootRoute
    }
    '/patients/$patientId/visits/': {
      id: '/patients/$patientId/visits/'
      path: '/patients/$patientId/visits'
      fullPath: '/patients/$patientId/visits'
      preLoaderRoute: typeof PatientsPatientIdVisitsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/change-password': typeof ChangePasswordRoute
  '/labs': typeof LabsRoute
  '/login': typeof LoginRoute
  '/main': typeof MainRoute
  '/patients/new': typeof PatientsNewRoute
  '/stock/$stockItemId': typeof StockStockItemIdRoute
  '/visits/$visitId': typeof VisitsVisitIdRoute
  '/patients': typeof PatientsIndexRoute
  '/stock': typeof StockIndexRoute
  '/patients/$patientId': typeof PatientsPatientIdIndexRoute
  '/patients/$patientId/visits/$visitId': typeof PatientsPatientIdVisitsVisitIdRoute
  '/patients/$patientId/visits/new': typeof PatientsPatientIdVisitsNewRoute
  '/patients/$patientId/visits': typeof PatientsPatientIdVisitsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/change-password': typeof ChangePasswordRoute
  '/labs': typeof LabsRoute
  '/login': typeof LoginRoute
  '/main': typeof MainRoute
  '/patients/new': typeof PatientsNewRoute
  '/stock/$stockItemId': typeof StockStockItemIdRoute
  '/visits/$visitId': typeof VisitsVisitIdRoute
  '/patients': typeof PatientsIndexRoute
  '/stock': typeof StockIndexRoute
  '/patients/$patientId': typeof PatientsPatientIdIndexRoute
  '/patients/$patientId/visits/$visitId': typeof PatientsPatientIdVisitsVisitIdRoute
  '/patients/$patientId/visits/new': typeof PatientsPatientIdVisitsNewRoute
  '/patients/$patientId/visits': typeof PatientsPatientIdVisitsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/change-password': typeof ChangePasswordRoute
  '/labs': typeof LabsRoute
  '/login': typeof LoginRoute
  '/main': typeof MainRoute
  '/patients/new': typeof PatientsNewRoute
  '/stock/$stockItemId': typeof StockStockItemIdRoute
  '/visits/$visitId': typeof VisitsVisitIdRoute
  '/patients/': typeof PatientsIndexRoute
  '/stock/': typeof StockIndexRoute
  '/patients/$patientId/': typeof PatientsPatientIdIndexRoute
  '/patients/$patientId/visits/$visitId': typeof PatientsPatientIdVisitsVisitIdRoute
  '/patients/$patientId/visits/new': typeof PatientsPatientIdVisitsNewRoute
  '/patients/$patientId/visits/': typeof PatientsPatientIdVisitsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/change-password'
    | '/labs'
    | '/login'
    | '/main'
    | '/patients/new'
    | '/stock/$stockItemId'
    | '/visits/$visitId'
    | '/patients'
    | '/stock'
    | '/patients/$patientId'
    | '/patients/$patientId/visits/$visitId'
    | '/patients/$patientId/visits/new'
    | '/patients/$patientId/visits'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/change-password'
    | '/labs'
    | '/login'
    | '/main'
    | '/patients/new'
    | '/stock/$stockItemId'
    | '/visits/$visitId'
    | '/patients'
    | '/stock'
    | '/patients/$patientId'
    | '/patients/$patientId/visits/$visitId'
    | '/patients/$patientId/visits/new'
    | '/patients/$patientId/visits'
  id:
    | '__root__'
    | '/'
    | '/change-password'
    | '/labs'
    | '/login'
    | '/main'
    | '/patients/new'
    | '/stock/$stockItemId'
    | '/visits/$visitId'
    | '/patients/'
    | '/stock/'
    | '/patients/$patientId/'
    | '/patients/$patientId/visits/$visitId'
    | '/patients/$patientId/visits/new'
    | '/patients/$patientId/visits/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ChangePasswordRoute: typeof ChangePasswordRoute
  LabsRoute: typeof LabsRoute
  LoginRoute: typeof LoginRoute
  MainRoute: typeof MainRoute
  PatientsNewRoute: typeof PatientsNewRoute
  StockStockItemIdRoute: typeof StockStockItemIdRoute
  VisitsVisitIdRoute: typeof VisitsVisitIdRoute
  PatientsIndexRoute: typeof PatientsIndexRoute
  StockIndexRoute: typeof StockIndexRoute
  PatientsPatientIdIndexRoute: typeof PatientsPatientIdIndexRoute
  PatientsPatientIdVisitsVisitIdRoute: typeof PatientsPatientIdVisitsVisitIdRoute
  PatientsPatientIdVisitsNewRoute: typeof PatientsPatientIdVisitsNewRoute
  PatientsPatientIdVisitsIndexRoute: typeof PatientsPatientIdVisitsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ChangePasswordRoute: ChangePasswordRoute,
  LabsRoute: LabsRoute,
  LoginRoute: LoginRoute,
  MainRoute: MainRoute,
  PatientsNewRoute: PatientsNewRoute,
  StockStockItemIdRoute: StockStockItemIdRoute,
  VisitsVisitIdRoute: VisitsVisitIdRoute,
  PatientsIndexRoute: PatientsIndexRoute,
  StockIndexRoute: StockIndexRoute,
  PatientsPatientIdIndexRoute: PatientsPatientIdIndexRoute,
  PatientsPatientIdVisitsVisitIdRoute: PatientsPatientIdVisitsVisitIdRoute,
  PatientsPatientIdVisitsNewRoute: PatientsPatientIdVisitsNewRoute,
  PatientsPatientIdVisitsIndexRoute: PatientsPatientIdVisitsIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/change-password",
        "/labs",
        "/login",
        "/main",
        "/patients/new",
        "/stock/$stockItemId",
        "/visits/$visitId",
        "/patients/",
        "/stock/",
        "/patients/$patientId/",
        "/patients/$patientId/visits/$visitId",
        "/patients/$patientId/visits/new",
        "/patients/$patientId/visits/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/change-password": {
      "filePath": "change-password.tsx"
    },
    "/labs": {
      "filePath": "labs.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/main": {
      "filePath": "main.tsx"
    },
    "/patients/new": {
      "filePath": "patients/new.tsx"
    },
    "/stock/$stockItemId": {
      "filePath": "stock/$stockItemId.tsx"
    },
    "/visits/$visitId": {
      "filePath": "visits/$visitId.tsx"
    },
    "/patients/": {
      "filePath": "patients/index.tsx"
    },
    "/stock/": {
      "filePath": "stock/index.ts"
    },
    "/patients/$patientId/": {
      "filePath": "patients/$patientId/index.tsx"
    },
    "/patients/$patientId/visits/$visitId": {
      "filePath": "patients/$patientId/visits/$visitId.tsx"
    },
    "/patients/$patientId/visits/new": {
      "filePath": "patients/$patientId/visits/new.tsx"
    },
    "/patients/$patientId/visits/": {
      "filePath": "patients/$patientId/visits/index.ts"
    }
  }
}
ROUTE_MANIFEST_END */
