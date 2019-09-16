import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import * as Agenda from 'agenda';

export interface AgendaModuleOptions extends Agenda.AgendaConfiguration {}

export interface AgendaOptionsFactory {
  createAgendaOptions(): Promise<AgendaModuleOptions> | AgendaModuleOptions;
}

export interface AgendaModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<AgendaOptionsFactory>;
  useClass?: Type<AgendaOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<AgendaModuleOptions> | AgendaModuleOptions;
  inject?: any[];
}
