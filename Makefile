IMAGE=talking-people/frontend
CONTAINER=talking-people.frontend
NETWORK=talking-people-network
COMMON=run -it --rm -v $(PWD):/app --net $(NETWORK)

docker-build:
	docker build -t $(IMAGE) .
	$(MAKE) npm-install
	$(MAKE) bower-install
	
run: _create-network
	docker $(COMMON) --name $(CONTAINER) -p 4200:4200 -p 49152:49152 $(IMAGE) ember server

start:
	docker start $(CONTAINER)

stop: 
	docker stop $(CONTAINER)

bash: _create-network
	docker $(COMMON) $(IMAGE) /bin/bash

npm-install: _create-network
	docker $(COMMON) $(IMAGE) npm install

bower-install: _create-network
	docker $(COMMON) $(IMAGE) bower --allow-root install

ember: 
	docker $(COMMON) $(IMAGE) ember $(arguments)

_create-network:
	-docker network create $(NETWORK)
