import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker} from 'react-leaflet';
import { loadItens } from '../../services/ItemService';
import { loadUFs, loadCitysByUFid } from '../../services/IBGEService';
import { createPoint } from '../../services/PointService';
import { CollectionItem, IBGE_FORMATED, CollectionPoint } from '../../shared/models';
import { LeafletMouseEvent } from 'leaflet';
import HeaderComponent from '../../components/Header';
import ListCollectionItensComponent from '../../components/ListCollectionItens';
import SelectComponent from '../../components/Select';
import InputComponent from '../../components/Input';
import './style.css';

const RegisterPointPage:React.FC = () => {
    const [itens, setItens] = useState<CollectionItem[]>([]);
    const [selectedItens, setSelectedItens] = useState<number[]>([]);
    const [ufs, setUfs] = useState<IBGE_FORMATED[] | any>([]);
    const [selectedUF, setSelectedUF] = useState('0');
    const [cities, setCities] = useState<IBGE_FORMATED | any>([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
    const [number, setNumber] = useState('');
    const [entity, setEntity] = useState({
        name: '', email: ''
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        });
    }, []);

    useEffect(() => {
        loadItens().then( 
            data => {
                setItens(data);
            },
            error => {
                alert('Not found itens');
            }
        );
    }, []);

    useEffect(() => {
        loadUFs().then(
            data => {
                setUfs(data);
            },
            error => {
                alert('Not found UFs');
            }
        );
    }, []);

    useEffect(() => {
       if(selectedUF === '0'){
            return;
       };
       loadCitysByUFid(selectedUF).then(
           data => {
                setCities(data);
           },
           error => {
            alert(`Not found City with this id: ${selectedUF}`);
           }
       );
    }, [selectedUF]);

    function handleMapClick(event:LeafletMouseEvent) {
        const {lat, lng} = event.latlng;
        setSelectedPosition([
            lat, lng
        ]);
    };

    function handleInputChange(e:ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setEntity({ ...entity, [name]: value });
    };

    function handleSelectItem(itemId:number) {
        const alreadySelected = selectedItens.findIndex(id => id === itemId);
        if(alreadySelected >= 0){
            const filteredItens = selectedItens.filter(id => id !== itemId);
            setSelectedItens(filteredItens);
        } else {
            setSelectedItens([ ...selectedItens, itemId ]);
        }
    };

    function handleCreatePoint(e:FormEvent) {
        e.preventDefault();
        const image = "https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=40";
        const data:CollectionPoint = {
            user_id: 1,
            email: entity.email,
            name: entity.name,
            image,
            address_latitude: selectedPosition[0],
            address_longitude: selectedPosition[1],
            address_number: number,
            address_city: selectedCity,
            address_uf: selectedUF,
            itens: selectedItens,
        };
        createPoint(data).then(
            response => {
                alert(`Point save with success.`);
            }, 
            error => {
                alert('Happened some error on time to create point, try again');
            }
        );
    }
    return(
        <div id="point-create-container">
            <HeaderComponent>
                <Link to={'/'}>
                    <FiArrowLeft />
                    Back Landing
                </Link>
            </HeaderComponent>
            <main>
                <form onSubmit={handleCreatePoint}>
                    <h1>Create collection point</h1>
                    <fieldset>
                        <legend>
                            <h2>Datas</h2>
                        </legend>
                        <div className="input-container-group">
                            <InputComponent 
                                type={"text"}
                                name={"name"}
                                label={"Entity Name"}
                                value={entity.name}
                                placeholder={"Type your entity name ..."}
                                onChange={handleInputChange}
                            /> 
                            <InputComponent 
                                type={"email"}
                                name={"email"}
                                label={"Entity Email"}
                                value={entity.email}
                                placeholder={"Type your entity email ..."}
                                onChange={handleInputChange}
                            /> 
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>
                            <h2>Address</h2>
                            <span>
                                Select the address on map
                            </span>
                        </legend>
                        <Map 
                            center={initialPosition}
                            zoom={15}
                            onClick={handleMapClick}
                        >
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={selectedPosition} />
                        </Map>
                        <div className="input-container-group">
                            <InputComponent 
                                type={"text"}
                                name={"addressNumber"}
                                label={"Address Number"}
                                value={number}
                                placeholder={"Type your address number ..."}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                            <SelectComponent 
                                datas={ufs}
                                defaultLabelOpition={"Select your State"}
                                name={"addressState"}
                                label={"Address State"}
                                value={selectedUF}
                                onChange={(e) => setSelectedUF(e.target.value)}
                            />
                        </div>
                        <SelectComponent 
                            datas={cities}
                            defaultLabelOpition={"Select your City"}
                            name={"addressCity"}
                            label={"Address City"}
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>
                            <h2>Collection Itens</h2>
                            <span>
                                Select one or more itens below
                            </span>
                        </legend>
                        <ListCollectionItensComponent  
                            collectionItens={itens}
                            itensSelected={selectedItens}
                            action={(itemId:number) => handleSelectItem(itemId)}
                        />
                    </fieldset>
                    <button type="submit">
                        Create
                    </button>
                </form>
            </main>
        </div>
    );
};
export default RegisterPointPage;