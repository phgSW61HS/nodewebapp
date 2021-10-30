docker build --tag pgolard/nodewebapp:v1 ./dockernodewebapp/.

docker push pgolard/nodewebapp:v1


apiVersion: v1
kind: Service
metadata:
  creationTimestamp: "2020-05-30T01:10:07Z"
  labels:
    run: nodewebapp-dep
  name: nodewebapp-svc
  namespace: lobelns
  resourceVersion: "2343579"
  selfLink: /api/v1/namespaces/lobelns/services/nodewebapp-svc
  uid: 3a69603d-a0cb-4546-974f-0346b13ba197
spec:
  clusterIP: 10.96.154.84
  ports:
  - port: 3000
    protocol: TCP
    targetPort: 3000
  selector:
    run: nodewebapp-dep
  sessionAffinity: None
  type: ClusterIP
status:
  loadBalancer: {}


http://192.168.64.7
