import UserOpinionItem from "./UserOpinionItem";

export default function MainUsersOpinions() {
    return <section className="p-10">
        <h1 className="text-3xl p-5">Lo que los usuarios piensan acerca de Ahorrar +</h1>
        <div className="flex flex-col justify-evenly lg:flex-row xl:flex-row 2xl:flex-row">
            <UserOpinionItem userName="Bill Gates" stars={4}
                             comment="Antes no podia comprar la licencia de Windows 11 por comprar licencias del paquete office. Ahora puedo controlar mas a detalle mis gastos y tener suficiente dinero para comprar todas las licencias que quiera, gracias a Ahorra+."/>
            <UserOpinionItem userName="Mark Suckerberg" stars={4} comment="Esta aplicación es limpia, clara y muy útil. Me encanta que pueda guardar todas mis compras en un historial y poder visualizar en que tipo de categoria gasto mas."/>
            <UserOpinionItem userName="Elon Musk" stars={4} comment="A partir del momento en el que me encontraba indeciso para comprar Twitter, decidí instalarme la aplicación Ahorra+ para controlar cuanto dinero gastaba por transaccion, esto me permitio ahorrar utilizarlo en la compra de un gran porcentaje de las acciones."/>
        </div>
    </section>
}