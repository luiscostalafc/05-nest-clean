import { AggregateRoot } from '../entities/aggregate-root';
import { UniqueEntityID } from '../entities/unique-entity-id';
import { DomainEvent } from './domain-event';
import { vi } from 'vitest';
import { DomainEvents } from './domain-events';

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

    return aggregate;
  }
}

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date;
  private aggregate: CustomAggregate;

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date();
    this.aggregate = aggregate;
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id;
  }
}

describe('Domain events', () => {
  it('should be able to dispatch and listen to events', async () => {
    const callback = vi.fn();

    // Subscriber cadastrado (ouvindo o evento qualquer, ex: "resposta criada")
    DomainEvents.register(callback, CustomAggregateCreated.name);

    // Estou criando uma resposta porém SEM salvar no banco
    const aggregate = CustomAggregate.create();

    // Estou assegurando que o evento foi criado porém NÃO foi disparado
    expect(aggregate.domainEvents).toHaveLength(1);

    // Estou salvando a resposta no banco de dados e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    // O subscriber ouve o evento e faz o que precisa ser feito com o dado
    expect(callback).toHaveBeenCalled();

    expect(aggregate.domainEvents).toHaveLength(0);
  });
});
